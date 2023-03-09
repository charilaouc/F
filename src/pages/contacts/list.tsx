import React from "react";
import {
    IResourceComponentsProps,
    useTable,
    HttpError,
} from "@pankod/refine-core";

import { IContacts } from "interfaces";

const ContactsList: React.FC<IResourceComponentsProps> = () => {
    const { tableQueryResult } = useTable<IContacts, HttpError>();
    console.log(tableQueryResult);
    const posts = tableQueryResult?.data?.data ?? [];
    console.log(posts);
    if (tableQueryResult?.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.email}>
                            <td>{post.first_name}</td>
                            <td>{post.rating}</td>
                            <td>{post.status}</td>
                            <td>{new Date(post.status).toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactsList;