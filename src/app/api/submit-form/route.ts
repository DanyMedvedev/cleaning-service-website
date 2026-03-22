import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

        // Проверка что переменная есть
        if (!SCRIPT_URL) {
            return NextResponse.json({ error: "GOOGLE_SCRIPT_URL is not set" }, { status: 500 });
        }

        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json({ status: "ok", data });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}