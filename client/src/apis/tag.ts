import request from "./request";

/**
 * @description 获取 标签列表
 * @author guolin
 * @date 10/23/2021
 * @url /tag/list
 * @method get
 */
export function getTagList(params = {}) {
  return request({
    url: "/tag/list",
    method: "get",
    params,
  });
}

/**
 * @description 获取 标签对应的博客
 * @author guolin
 * @date 10/23/2021
 * @url /tag/blog-list
 * @method get
 */
export function getTagBlogList(params = {}) {
  return request({
    url: "/tag/blog-list",
    method: "get",
    params,
  });
}
