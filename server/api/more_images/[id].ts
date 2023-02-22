import { getMoreImages } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
    const id = String(event.context.params?.id);

    try {
        console.log("event.node.req.url :", event.node.req.url);

        const data = await getMoreImages(id);

        return data;
    } catch (error: any) {
        return console.log(error.message);
    }
});
