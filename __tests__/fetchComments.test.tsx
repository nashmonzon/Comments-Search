import { fetchComments } from "../lib/fetchComments";

const mockData = [
  {
    postId: 1,
    id: 1,
    name: "Test User",
    email: "test@example.com",
    body: "This is a body with keyword dolor",
  },
  {
    postId: 1,
    id: 2,
    name: "Another User",
    email: "another@example.com",
    body: "This is unrelated content",
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData),
  })
) as unknown as jest.Mock;

describe("fetchComments", () => {
  it("returns only comments matching the query in body", async () => {
    const result = await fetchComments("dolor");

    expect(result).toHaveLength(1);
    expect(result[0].body).toContain("dolor");
  });

  it("returns a maximum of 20 comments", async () => {
    const bigMock = Array.from({ length: 100 }, (_, i) => ({
      postId: 1,
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      body: `contains dolor ${i + 1}`,
    }));

    (fetch as unknown as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(bigMock),
    });

    const result = await fetchComments("dolor");

    expect(result).toHaveLength(20);
  });
  it("returns an empty array if no match is found", async () => {
    const result = await fetchComments("palabraqueNoExiste");
    expect(result).toHaveLength(0);
  });
});
