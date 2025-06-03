interface FetchOptions<R = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: R;
  revalidate?: number;
  headers?: HeadersInit;
}

export const nextFetcher = async <T, R = unknown>(
  url: string,
  options: FetchOptions<R> = {}
) => {
  const { method = 'GET', body, revalidate, headers = {} } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(revalidate !== undefined
      ? { next: { revalidate } }
      : { cache: 'no-store' }),
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      fetchOptions
    );
    const json = await res.json();

    if (!res.ok) {
      throw {
        code: res.status,
        message: json.message || '알 수 없는 에러가 발생하였습니다.',
      };
    }

    return json as T;
  } catch (error) {
    if (
      typeof error === 'object'
      && error !== null
      && 'code' in error
      && 'message' in error
    ) {
      throw error;
    }

    throw {
      code: -1,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 에러가 발생하였습니다.',
    };
  }
};
