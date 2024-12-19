import connectMongoDB from "@/mongodb/mongodb";

export async function POST(request) {
    try {
        await connectMongoDB();

    } catch (error) {

    }

}