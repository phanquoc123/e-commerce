export const CATEGORY_EXAMPLES = {
  SINGLE_CATEGORY: {
    id: 1,
    name: 'Shoes',
    slug: 'shoes',
    thumbnail: 'https://example.com/shoes-thumbnail.jpg',
    parent_id: null,
    is_active: true,
    sort_order: 0,
  },
  
  UPDATED_CATEGORY: {
    id: 1,
    name: 'Sneakers',
    slug: 'sneakers',
    thumbnail: 'https://example.com/sneakers-thumbnail.jpg',
    parent_id: null,
    is_active: true,
    sort_order: 5,
  },

  CATEGORY_LIST: [
    {
      id: 1,
      name: 'Shoes',
      slug: 'shoes',
      thumbnail: 'string',
      parent_id: null,
      is_active: true,
      sort_order: 0,
    },
  ],
};

export const PAGINATION_EXAMPLES = {
  paginate: {
    page: 1,
    limit: 10,
    total: 25,
    totalPages: 3,
    hasNextPage: true,
    hasPrevPage: false,
  },
};

export const API_RESPONSE_EXAMPLES = {
  SUCCESS_RESPONSE: (result: any) => ({
    data: {
      status: 200,
      message: 'OK',
      success: true,
      result,
    },
  }),

  PAGINATED_RESPONSE: (data: any[], paginate: any) => ({
    status: 200,
    message: 'OK',
    success: true,
    data,
    paginate,
  }),

  DELETE_RESPONSE: {
    data: {
      status: 200,
      message: 'OK',
      success: true,
      result: { deleted: true },
    },
  },
};