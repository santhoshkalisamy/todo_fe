import {BellRing, Check} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type TodoCardProps = {
    title: string,
    done: boolean,
    _id: number,
    dueDate: string,
    description: string,
    onDelete: (id: number) => void,
    onUpdate: (_id: number) => void
}

export function TodoCard(todo: TodoCardProps) {
    const dueDate = todo.dueDate ? new Date(todo.dueDate).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }) : 'No due date';

    return (
        <Card className="w-[380px] border-none bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-emerald-500 text-white p-4">
                <CardTitle className="text-xl font-bold">{todo.title}</CardTitle>
                <CardDescription className="text-sm text-white">{todo.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex items-center space-x-4 rounded-md border p-4 bg-gray-100">
                    <BellRing className="text-blue-500"/>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Due on</p>
                        <p className="text-sm text-gray-700">{dueDate}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 bg-gray-50">
                <Button onClick={() => todo.onUpdate(todo._id)} disabled={todo.done} className="bg-green-500 text-white hover:bg-green-600">
                    <Check className="mr-2"/>{todo.done ? 'Completed' : 'Mark as done'}
                </Button>
                <Button onClick={() => todo.onDelete(todo._id)} className="bg-red-500 text-white hover:bg-red-600">
                    <Check className="mr-2"/> Delete
                </Button>
            </CardFooter>
        </Card>
    )
}
