import User from "@/models/user";
import connectMongoDB from "@/mongodb/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectMongoDB();

        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');

        const some = new User({
            name,
            email
        })
        await some.save();
        return NextResponse.json({ success: true, message: "Category Created" }, { status: 201 })

    } catch (error) {
        console.error('something went wrong when create a category: ', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 400 })
    }
}