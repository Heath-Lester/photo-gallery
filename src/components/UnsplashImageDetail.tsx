import { ReactNode } from 'react';
import { Nullable } from 'unsplash-js/dist/helpers/typescript';

export default function UnsplashImageDetail({
    title,
    content,
}: {
    title: string;
    content: string | Nullable<string> | null;
}): ReactNode | null {
    return !!content && content.length > 0 ? (
        <div>
            <p className='opacity-50'>{title}</p>
            <p className='pl-3 text-small break-words'>{content}</p>
        </div>
    ) : null;
}
