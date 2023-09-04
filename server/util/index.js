import { POSTS_PER_PAGE } from "../constants/index.js";

export const formatFormDate = (inputDate) => {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  return new Date(dateString);
};

export const computeDateFilters = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const dateFilters = {
    today: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
    "this week": {
      $gte: startOfWeek,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
    "this month": {
      $gte: startOfMonth,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  };

  return dateFilters;
};

export function buildAggregatePipeline(filterConditions, order, skip) {
  const pipeline = [
    { $match: filterConditions },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
    {
      $addFields: {
        averageRating: {
          $ifNull: [{ $avg: "$comments.rating" }, 1],
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "authorId",
        foreignField: "_id",
        as: "authorData",
      },
    },
    {
      $unwind: "$authorData",
    },

    {
      $project: {
        title: 1,
        description: 1,
        createdDate: 1,
        imageUrl: 1,
        likes: 1,
        category: 1,
        public: 1,
        _id: 1,
        authorId: 1,
        averageRating: 1,
        "authorData.name": 1,
        "authorData.surname": 1,
      },
    },
  ];

  if (order) {
    if (order.includes("date")) {
      pipeline.push({
        $sort: {
          createdDate: order.includes("asc") ? 1 : -1,
          _id: 1,
        },
      });
    }
    if (order.includes("rate")) {
      pipeline.push({
        $sort: {
          averageRating: order.includes("asc") ? 1 : -1,
          _id: 1,
        },
      });
    }
  } else {
    pipeline.push({
      $sort: {
        createdDate: -1,
        _id: 1,
      },
    });
  }

  pipeline.push({ $skip: skip }, { $limit: POSTS_PER_PAGE });

  return pipeline;
}
