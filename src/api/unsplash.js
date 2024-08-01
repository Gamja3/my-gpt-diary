import axios from "axios";

export const Unsplash = async ({ query }) => {
    console.log(">>Unsplash");

    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
            query,
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
            page: 1,
            per_page: 1,
            order_by: "relevant", // Optional: you can choose 'latest' or 'relevant'
            content_filter: "low", // Optional: you can choose 'low' or 'high'
        },
    });
    return response.data;
};
