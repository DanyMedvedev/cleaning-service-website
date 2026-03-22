import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch("https://script.google.com/macros/s/AKfycbweI4FFvB5FE1M4TAkcZVjIkb1Q_amW_kw-waPBiOhcYc5cYD8I6ZwZv6tDtXvKR7Vs/exec", {
            method: "POST",
            redirect: "follow",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(body),
        });

        const text = await res.text();
        return NextResponse.json({ status: "ok", response: text });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}