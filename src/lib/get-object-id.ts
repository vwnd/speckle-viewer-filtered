export async function getObjectId() {
  const query = `
  query GetLevels($streamId: String!, $objectId: String!, $query: [JSONObject!], $select: [String], $cursor: String) {
    stream(id: $streamId) {
      object(id: $objectId) {
        children(query: $query, select: $select, cursor: $cursor, limit: 5000) {
          objects {
            data
          }
          totalCount
          cursor
        }
      }
    }
  }`;

  const variables = {
    streamId: "e271025504",
    objectId: "67f2fff38c519fcf027addff2c8e243d",
    query: [
      {
        field: "level.name",
        operator: "=",
        value: "LEVEL 03 FFL",
      },
    ],
    select: ["level"],
  };

  const response = await fetch("https://perkinswill.speckle.xyz/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  const objects = data.data.stream.object.children.objects;
  const objectsIds = objects.map((object: any) => object.data.id);
  const totalCount = data.data.stream.object.children.totalCount;
  const cursor = data.data.stream.object.children.cursor;

  console.log("objectsIds", objectsIds.length);
  console.log("totalCount", totalCount);

  // return ["67f2fff38c519fcf027addff2c8e243d"];
  // return [
  //   "6059c8c3235b2b0ef55990387a7443e9",
  //   "41de86acefd01fe091ee45a62b4e5166",
  // ];
  return objectsIds;
}
