export async function POST(req: Request) {
    const body = await req.json();

    const res = await fetch(process.env.MENTOR_LINK_URL as string, {
        method: "POST",
        body: JSON.stringify(body),
    });

    return Response.json({ status: "ok" });
}