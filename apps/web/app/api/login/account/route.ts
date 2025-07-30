export function POST() {
  return Response.json({
    status: "ok",
    type: "account",
    currentAuthority: "admin",
  });
}
