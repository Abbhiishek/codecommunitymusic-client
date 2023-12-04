'use client'

import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { Message } from '@/lib/validators/message'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Send } from 'lucide-react'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from '../ui/use-toast'

interface ChatInputProps extends HTMLAttributes<HTMLDivElement> { }

const ChatInput: FC<ChatInputProps> = ({ className, ...props }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [input, setInput] = useState<string>('')
    const {
        messages,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
    } = useContext(MessagesContext)

    const { mutate: sendMessage, isLoading } = useMutation({
        mutationKey: ['sendMessage'],
        // include message to later use it in onMutate
        mutationFn: async (_message: Message) => {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages }),
            })

            return response.body
        },
        onMutate(message) {
            addMessage(message)
        },
        onSuccess: async (stream) => {
            if (!stream) throw new Error('No stream')

            // construct new message to add
            const id = nanoid()
            const responseMessage: Message = {
                id,
                isUserMessage: false,
                text: '',
            }

            // add new message to state
            addMessage(responseMessage)

            setIsMessageUpdating(true)

            const reader = stream.getReader()
            const decoder = new TextDecoder()
            let done = false

            while (!done) {
                const { value, done: doneReading } = await reader.read()
                done = doneReading
                const chunkValue = decoder.decode(value)
                updateMessage(id, (prev) => prev + chunkValue)
            }

            // clean up
            setIsMessageUpdating(false)
            setInput('')

            setTimeout(() => {
                textareaRef.current?.focus()
            }, 10)
        },
        onError: (_, message) => {
            toast({
                title: 'Error sending message',
                description: message.text,
            })
            removeMessage(message.id)
            textareaRef.current?.focus()
        },
    })

    return (
        <div {...props} className={cn('border-t  w-full', className)}>
            <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
                <TextareaAutosize
                    ref={textareaRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()

                            const message: Message = {
                                id: nanoid(),
                                isUserMessage: true,
                                text: input,
                            }

                            sendMessage(message)
                        }
                    }}
                    rows={2}
                    maxRows={4}
                    value={input}
                    autoFocus
                    disabled={isLoading}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Write a message...'
                    className='peer disabled:opacity-50  resize-none block w-full border-0 bg-slate-800  py-2 text-white focus:ring-0 text-sm sm:leading-6'
                />

                <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                    <kbd className='inline-flex items-center rounded border bg-transparent border-gray-200 px-1 font-sans text-xs text-gray-400'>
                        {isLoading ? (
                            <Loader2 className='w-3 h-3 animate-spin' />
                        ) : (
                            <Send className='w-4 h-4' />
                        )}
                    </kbd>
                </div>

                <div
                    className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600'
                    aria-hidden='true'
                />
            </div>
        </div>
    )
}

export default ChatInput
