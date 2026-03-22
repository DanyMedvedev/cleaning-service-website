import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch("https://script.google.com/macros/s/AKfycbxWQmcUR0vq8BKenVOFCZeg53UtYAIghBO_6hWnhbyQUcug0nNQO9IBO9hSGraQZ-L0/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const text = await res.text();
        return NextResponse.json({ status: "ok", response: text });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}