import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { BreadcrumbsProps } from "types/breadcrumbs";
import { Ancestor } from "types/folder";
const Breadcrumbs = ({ ancestors, currentName }: BreadcrumbsProps) => {
  const items = [
    ...ancestors.map((ancestor: Ancestor) => ({
      title:
        ancestor.id === null ? (
          <Link to="/">
            <HomeOutlined /> {ancestor.name}
          </Link>
        ) : (
          <Link to={`/folders/${ancestor.id}`}>{ancestor.name}</Link>
        ),
    })),
    { title: currentName },
  ];

  return <Breadcrumb items={items} />;
};

export default Breadcrumbs;
