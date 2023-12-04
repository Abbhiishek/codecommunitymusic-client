'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FC } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const Chat: FC = () => {
    return (
        <>
            <Card className="w-full  flex flex-col  text-white">
                <CardHeader>
                    <CardTitle>
                        <ChatHeader />
                    </CardTitle>
                    <CardDescription>
                        LinusGPT 🤖 is a bot that will help you find the right
                        information about the program you are looking for.
                    </CardDescription>
                </CardHeader>
                <CardContent className="overflow-y-auto ">
                    <ChatMessages className='px-2 py-3 flex-1 max-h-screen h-[350px]' />
                </CardContent>
                <CardFooter >
                    <ChatInput />
                </CardFooter>
            </Card>
        </>
    )
}

export default Chat
