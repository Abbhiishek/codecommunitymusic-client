import { Loader } from 'lucide-react'

function loading() {
    return (
        <div>
            <Loader size="100px" className='animate-spin' />
        </div>
    )
}

export default loading