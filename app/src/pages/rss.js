import Parser from 'rss-parser/dist/rss-parser.min.js';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Skeleton } from 'primereact/skeleton';
import { Card } from 'primereact/card';


const parser = new Parser();

const rssOptions = {
    replace: (domNode) => {
        if (domNode.name === 'img') {
            return (
                <img 
                    {...domNode.attribs}
                    style={{ maxWidth: "150px", height: "85px" }}
                    lazy="true"
                    alt="Preview"
                />
            );
        }
    }
};

export default function RSSComponent() {
    const [rss, setRSS] = useState();

    useEffect(() => {
        async function loadRSS() {
            try {
                const RSS_URL = "https://habr.com/ru/rss/users/VAnderskaeV/articles/?fl=ru";
                const proxyUrl = `https://anderskaev.ru/rss_proxy.php?url=${encodeURIComponent(RSS_URL)}`;

                const feed = await parser.parseURL(proxyUrl);
                setRSS(feed.items);
                // console.log(feed.items);
            } catch (err) {
                setRSS('Ошибка загрузки RSS');
                // console.log(err);
            }
        }
        loadRSS();
    }, [])

    return (
        <>
            {
                !rss ? (
                    <>
                    <Card title={<Skeleton width='25rem' height="2rem"></Skeleton>}>
                        <Skeleton width="15rem" className="mb-2"></Skeleton>
                        <Skeleton width="10rem" height="4rem"></Skeleton>
                        <Skeleton height="7rem" className="mb-2"></Skeleton>
                        <Skeleton width='5rem'></Skeleton>
                    </Card>                        
                    </>
                ) :
                    <>
                        {rss.map((item) => {
                            return (
                                <Card key={item.guid} title={<a href={item.link}>{item.title}</a>}>
                                    
                                    <div>{item.pubDate}</div>

                                    <div>{parse(item.content, rssOptions)}</div>
                                </Card>
                            )
                        })}
                    </>
            }
        </>
    )

}