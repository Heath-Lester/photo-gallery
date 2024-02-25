export default function GalleryPlaceholder({ displayText }: { displayText: string }): React.ReactNode {
    return <span className='flex m-6 justify-center text-small'>{displayText}</span>;
}
