'use client'

import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useContext } from 'react'
import MarkdownLite from './MarkdownLite'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> { }

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const { messages } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse()

    return (
        <div
            {...props}
            className={cn(
                'flex w-full flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',
                className
            )}>
            <div className='flex-1 flex-grow w-full' />
            {inverseMessages.map((message) => {
                return (
                    <div className='chat-message' key={`${message.id}-${message.id}`}>
                        <div
                            className={cn('flex items-end', {
                                'justify-end': message.isUserMessage,
                            })}>
                            <div
                                className={cn('flex flex-col space-y-2 text-sm max-w-lg mx-2 overflow-x-hidden', {
                                    'order-1 items-end': message.isUserMessage,
                                    'order-2 items-start': !message.isUserMessage,
                                })}>
                                <p
                                    className={cn('px-4 py-2 rounded-lg w-full', {
                                        'bg-blue-600 text-white': message.isUserMessage,
                                        'bg-green-900  font-mono': !message.isUserMessage,
                                    })}>
                                    <MarkdownLite text={message.text} isuser={message.isUserMessage} />
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChatMessages
