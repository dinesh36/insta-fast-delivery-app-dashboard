// eslint-disable-next-line import/prefer-default-export
import {generateMockOrders} from "@/utils/generateMockOrders";

export async function GET(route: Request) {
    //TODO set the filters here based on the request parameters
    const orders = generateMockOrders();
    await new Promise((resolve) => setTimeout(resolve, 3000)); //set the fake timeout
    return new Response(JSON.stringify(orders), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
