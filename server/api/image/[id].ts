import { getImageById } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
    const id = String(event.context.params?.id);

    try {
        console.log("event.node.req.url :", event.node.req.url);

        const data = await getImageById(id);

        if (data) {
            return data;
        } else {
            throw Error;
        }
    } catch (error: any) {
        console.log("error :", error);
        return undefined;
    }
});
