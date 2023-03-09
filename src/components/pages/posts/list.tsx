import { IResourceComponentsProps, useExport } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
    getDefaultSortOrder,
    FilterDropdown,
    Select,
    useSelect,
    ExportButton,
    ImportButton,
    CreateButton,
    useImport,
} from "@pankod/refine-antd";

import { ICategory, IPost } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IPost>({
        metaData: {
            fields: [ "id", "title", "category" ],
        },
        

    });


    

    
    return (
        <List>
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                    ...tableProps.pagination,
                    showSizeChanger: true,
                }}
            >
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter={{ multiple: 3 }}
                />
                <Table.Column
                    dataIndex="title"
                    title="Title"
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter={{ multiple: 2 }}
                />

                <Table.Column<{ id: string }>
                    title="Actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};