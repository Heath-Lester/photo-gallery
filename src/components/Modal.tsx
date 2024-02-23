// 'use client';

// import Link from 'next/link';
// import { usePathname, useSearchParams } from 'next/navigation';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { ApiResponse } from 'unsplash-js/dist/helpers/response';
// import { Full } from 'unsplash-js/dist/methods/photos/types';
// import { Card, CardBody } from '@nextui-org/react';
// import { createApi } from 'unsplash-js';
// import nodeFetch from 'node-fetch';

// export default function Modal() {
//     const [accessKey] = useState<string>(
//         process.env.UNSPLASH_ACCESS_KEY as string,
//     );
//     const searchParams = useSearchParams();
//     const [key] = useState<string | null>(searchParams.get('photo'));
//     const [pathname] = useState<string | null>(usePathname());
//     const [modal] = useState<string | null>(searchParams.get('modal'));
//     const [response, setResponse] = useState<Full | null>(null);

//     if (!key || !accessKey) return null;
//     const unsplash = createApi({
//         accessKey: accessKey,
//         fetch: nodeFetch.default as unknown as typeof fetch,
//     });

//     if (!unsplash) return null;

//     unsplash.photos
//         .get({ photoId: key })
//         .catch((err) => {
//             console.error('Failed to fetch image by id', err);
//         })
//         .then((r: ApiResponse<Full> | void) => {
//             if (r && r.response) {
//                 setResponse(r.response);
//             }
//         });

//     if (!key || !unsplash || !pathname || !modal) return null;

//     if (!response || !response.id) {
//         return <h2>Loading...</h2>;
//     } else {
//         return (
//             <Link href={pathname}>
//                 <dialog className='fixed left-0 top-0 w-full h-full bg-black bg-opacity-5 z-50 overflow-auto backdrop-blur flex justify-center items-center'>
//                     <div className='rounded-md bg-background m-auto p-8'>
//                         <div className='flex flex-col items-center'>
//                             <Card
//                                 className='modal fade'
//                                 id='cardDetailed'
//                                 role='dialog'
//                             >
//                                 <CardBody>
//                                     <Image
//                                         alt={
//                                             response.alt_description ??
//                                             'description'
//                                         }
//                                         src={response.urls.full}
//                                         height={response.height}
//                                         width={response.width}
//                                         loading='lazy'
//                                         decoding='async'
//                                         data-nimg='fill'
//                                         className='rounded-md'
//                                     />
//                                 </CardBody>
//                             </Card>
//                         </div>
//                     </div>
//                 </dialog>
//             </Link>
//         );
//     }
// }
