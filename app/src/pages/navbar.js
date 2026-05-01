
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate, useLocation } from 'react-router';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {id: 0, label: "GitHub", command: () => navigate("/"), path:"/"},
        {id: 1, label: "Habr RSS", command: () => navigate("/rss"), path:"/rss"}
    ]

    const activeIndex = items.findIndex(item => item.path === location.pathname);
  
    return (
        <TabMenu model={items} activeIndex={Math.max(0, activeIndex)} />
    )

}