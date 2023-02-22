import { queryByCollection } from "../../lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        // console.log("getQuery(event.req) :", getQuery(event.req));
        console.log("event.node.req.url :", event.node.req.url);
        const query = getQuery(event);

        console.log("query :", query);

        const docs = await queryByCollection(query.col as string);
        return { result: docs };
    } catch (error: any) {
        return { result: [], error: error.message };
    }
});
