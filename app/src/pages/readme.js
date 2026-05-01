import { useState, useEffect } from 'react';
import { marked } from 'marked'
import { markedEmoji } from 'marked-emoji'
import { nameToEmoji } from 'gemoji'
import parse from 'html-react-parser';
import { Skeleton } from 'primereact/skeleton';
import { Card } from 'primereact/card';

marked.use(markedEmoji({
    emojis: nameToEmoji,
    unicode: true,
    renderer: (token) => token.emoji
}))

export default function Readme() {
    const [html, setHtml] = useState();
    const [repos, setRepos] = useState();

    useEffect(() => {
        async function loadMarkdown() {
            try {
                // В React (Create React App/Vite) файлы из public доступны по прямому пути '/'
                const response = await fetch('/README.md');
                const text = await response.text();
                const parsedHtml = await marked.parse(text);
                setHtml(parsedHtml);
            } catch (err) {
                setHtml('Ошибка загрузки файла');
                console.error(err);
            }
        }

        async function loadRepos() {
            try {
                // В React (Create React App/Vite) файлы из public доступны по прямому пути '/'
                const response = await fetch('https://anderskaev.ru/gitrepos.php');
                const text = await response.json();
                setRepos(text);
            } catch (err) {
                setRepos('Ошибка загрузки файла Repo');
                console.error(err);
            }
        }

        loadRepos()
        loadMarkdown();
    }, []); // Пустой массив означает, что загрузка пройдет 1 раз при старте



    return (
        <>
            <Card>
                {
                    !html ? <Skeleton height="7rem" className="mb-2"></Skeleton>
                        : <div>{parse(html)}</div>
                }
            </Card>
            <Card title="My repositories">
                {
                    !repos ? <Skeleton height="7rem" className="mb-2"></Skeleton> : repos.map((repo)=>{
                        return (
                            <div key={repo.name}>
                                <a href={repo.url}>{repo.name}</a>
                                <div>{repo.description}</div>
                            </div>
                        )
                    })
                }
            </Card>
        </>
    )
}