export const fetcher = async (
  pathname: string,
  method: "PUT" | "GET" | "POST" | "DELETE",
  body?: Object,
  headers?: HeadersInit,
) => {
  const url = process.env.NEXT_PUBLIC_API_URL + pathname;
  const isFormData = body instanceof FormData;
  let _headers = headers ?? {};
  // @ts-ignore
  if (!isFormData && body) _headers["Content-Type"] = "application/json";
  const res = await fetch(url, {
    method,
    headers: _headers,
    credentials: "include",
    body: !body ? undefined : isFormData ? body : JSON.stringify(body),
    // body: !body ? undefined : JSON.stringify(body),
  });

  const data = await res.json();

  if (res.ok) return data;

  throw data;
};
