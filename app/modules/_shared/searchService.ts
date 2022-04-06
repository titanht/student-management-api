import _ from 'lodash';
import { Keys, QueryType } from './types';
import Model from './model';
import { getQueryCount } from 'app/services/utils';

export type Filter = {
  op: string;
  value: any;
};

export type OrderBy = {
  field: string;
  op?: 'asc' | 'desc';
};

const recursivePreload = (query: QueryType, relations: Record<string, any>) => {
  const keys = Keys(relations);
  keys.forEach((key) => {
    const { where, ...childRel } = relations[key];

    if (_.isEmpty(childRel)) {
      return query.preload(key as any, (builder) => {
        if (!_.isEmpty(where)) {
          where.forEach(({ field, op, value }) => {
            builder.where(field, op, value);
          });
        }
      });
    } else {
      return query.preload(key as any, (builder) => {
        if (!_.isEmpty(where)) {
          where.forEach(({ field, op, value }) => {
            builder = builder.where(field, op, value);
          });
        }
        recursivePreload(builder, childRel);
      });
    }
  });
};

const preloadRelations = (query: QueryType, withs: Record<string, any>) => {
  if (!_.isEmpty(withs)) {
    recursivePreload(query, withs);
  }
  return query;
};

const recursiveWhereHas = (
  query: QueryType,
  hasFilters: Record<string, any>
) => {
  const keys = Keys(hasFilters);
  keys.forEach((key) => {
    const { filters, ...childRel } = hasFilters[key];
    if (!_.isEmpty(filters)) {
      query = query.whereHas(key as any, (builder) => {
        filters.forEach(({ field, op, value }) => {
          builder.where(field, op, value);
        });
      });
    }
    if (!_.isEmpty(childRel)) {
      return query.whereHas(key as any, (builder) => {
        recursiveWhereHas(builder, childRel);
      });
    }
  });
};

const whereHasFilters = (query: QueryType, filters: Record<string, any>) => {
  if (!_.isEmpty(filters)) {
    recursiveWhereHas(query, filters);
  }
  return query;
};

const recursiveWhereDoesntHave = (
  query: QueryType,
  hasFilters: Record<string, any>
) => {
  const keys = Keys(hasFilters);
  keys.forEach((key) => {
    const { filters, ...childRel } = hasFilters[key];
    if (!_.isEmpty(filters)) {
      query = query.whereDoesntHave(key as any, (builder) => {
        filters.forEach(({ field, op, value }) => {
          builder.where(field, op, value);
        });
      });
    }
    if (!_.isEmpty(childRel)) {
      return query.whereDoesntHave(key as any, (builder) => {
        recursiveWhereDoesntHave(builder, childRel);
      });
    }
  });
};

const whereDoesntHaveFilters = (
  query: QueryType,
  filters: Record<string, any>
) => {
  if (!_.isEmpty(filters)) {
    recursiveWhereDoesntHave(query, filters);
  }
  return query;
};

const applyMainFilters = (
  query: QueryType,
  mainFilters: Record<string, Filter>
) => {
  if (!_.isEmpty(mainFilters)) {
    const fields = Keys(mainFilters);
    fields.forEach((field) => {
      const { op, value } = mainFilters[field];
      query = query.where(field, op, value);
    });
  }

  return query;
};

const applyOrdering = (query: QueryType, orderBies: OrderBy[]) => {
  if (!_.isEmpty(orderBies)) {
    orderBies.forEach(({ op, field }) => {
      query = query.orderBy(field, op || 'asc');
    });
  }

  return query;
};

const applyPaginate = async (
  query: QueryType,
  page: string,
  perPage: string
) => {
  if (page || perPage) {
    return query.paginate(_.parseInt(page) || 1, _.parseInt(perPage) || 10);
  }

  return query;
};

export default class SearchService {
  static async search(model: typeof Model, searchParams: Record<string, any>) {
    let {
      withs,
      whereHas,
      mainFilters,
      orderBies,
      whereDoesntHave,
      page,
      perPage,
    } = searchParams;

    let query = model.query();

    query = preloadRelations(query, withs);
    query = whereHasFilters(query, whereHas);
    query = whereDoesntHaveFilters(query, whereDoesntHave);
    query = applyMainFilters(query, mainFilters);
    query = applyOrdering(query, orderBies);
    await applyPaginate(query, page, perPage);

    return query;
  }

  static async getSearchCount(
    model: typeof Model,
    searchParams: Record<string, any>
  ) {
    let { whereHas, mainFilters, whereDoesntHave } = searchParams;

    let query = model.query();

    query = whereHasFilters(query, whereHas);
    query = whereDoesntHaveFilters(query, whereDoesntHave);
    query = applyMainFilters(query, mainFilters);

    return getQueryCount(query);
  }
}

/**
 * Samples
 *
 *
  // Main Filter
  "mainFilters": {
      "evaluation_method_id": {
          "op": "=",
          "value": "17cf7057-f93f-4e39-a32b-4d655be50b0c"
      }
  }

  // Where Has
  {
    "whereHas": {
        "gradeStudents": {
            "filters": [
                {
                    "field": "grade_id",
                    "op": "=",
                    "value": "{{gradeId}}"
                },
                {
                    "field": "academic_year_id",
                    "op": "=",
                    "value": "{{academicYearId}}"
                }
            ]
        },
        "payments": {
            "filters": [
                {
                    "field": "academic_year_id",
                    "op": "=",
                    "value": "{{academicYearId}}"
                },
                {
                    "field": "payment_type",
                    "op": "=",
                    "value": "Registration"
                }
            ]
        }
    }

    // With
    {
    "withs": {
        "gradeStudents": {
            "where": [
                {
                    "field": "academic_year_id",
                    "op": "=",
                    "value": "{{academicYearId}}"
                }
            ],
            "grade": {}
        },
        "profile": {}
    }

}
}
 */
