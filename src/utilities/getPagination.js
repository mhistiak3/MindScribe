/*
 * Title: getPagination
 * Description: Pagination Object
 * Author: Istiak Ahammad
 * Date: 8/22/2024
 *
 */

const getPagination = (currentRoute, reqParams, limit, totalBlogs) => {
  const pageNumber = Number(reqParams.pageNumber) || 1;
  const skip = limit * (pageNumber - 1);
  const totalPage = Math.ceil(totalBlogs / limit);
  const currentPage = pageNumber;

  const paginateObj = {
    next:
      totalBlogs > pageNumber * limit
        ? `${currentRoute}page/${pageNumber + 1}`
        : null,
    prev: skip && currentPage <= totalPage? `${currentRoute}page/${pageNumber - 1}` : null,
    totalPage,
    currentPage,
    limit,
    skip,
  };

  return paginateObj;
};
module.exports = getPagination;
