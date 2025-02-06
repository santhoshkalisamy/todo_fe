'use client'

import React from 'react'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox";
import {MdAdd} from "react-icons/md";
import {Textarea} from "@/components/ui/textarea";
import {Loader2} from "lucide-react";


interface AddTodoButtonProps {
    onAddTodo: () => void
}

const AddTodoButton = ({onAddTodo}: AddTodoButtonProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');
    const [generationInProgress, setGenerationInProgress] = React.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showAIButton, setShowAIButton] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
    const dueDateValue = formData.get('dueDate') as string;
    const dueDate = dueDateValue ? new Date(dueDateValue).toISOString() : '';
       const done = !!formData.get('isDone');
        if (title === '' || description === '') {
            console.log('Please fill all the fields');
            alert('Please fill all the fields');
            return;
        }
        console.log({title, description, dueDate, done});
        fetch('http://localhost:3100/api/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, dueDate, done})
        }).then(response => {
            if (response.ok) {
                //form.reset();
                setIsOpen(false);
                onAddTodo();

            }
        }).catch(error => {
            console.error('Error adding item', error);
        }).finally(() => {
            setIsSaving(false);
        });
    }

    function generateDescription() {
        setGenerationInProgress(true);
        console.log('Generating description');
        console.log('Calling AI');
        console.log(title);
        console.log(dueDate);
        fetch('http://localhost:3100/api/todo/generate-description',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, dueDate})
        })
            .then(response => response.json())
            .then(json => {
                const description = json as string;
                setDescription(description);
                console.log(description);
                setGenerationInProgress(false);
            }
        ).catch(error => {
            console.error('Error generating description', error);
            setGenerationInProgress(false);
        })
    }

    return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild className="absolute bottom-8 right-8">
                    <Button variant="default" size="icon" className="absolute top-5 right-8 w-12 h-12 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600">
                        <MdAdd />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add new item</DialogTitle>
                        <DialogDescription>
                            Click the button below to add a new item to your list.
                        </DialogDescription>
                    </DialogHeader>
                    <form method="post" onSubmit={handleFormSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Title
                                </Label>
                                <Input id="title" name="title" className="col-span-3" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dueDate" className="text-right">
                                    Due Date
                                </Label>
                                <Input onChange={(e) => setDueDate(e.currentTarget.value)} id="dueDate" name="dueDate" type="datetime-local" className="col-span-3" value={dueDate}/>
                            </div>
                            {showAIButton && <div className="flex flex-row justify-end">
                                <Button type="button" variant="outline"
                                        className="hover:text-white bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-gray-100 hover:font-extrabold"
                                        disabled={generationInProgress}
                                        onClick={generateDescription}
                                >
                                    {generationInProgress && <Loader2 className="animate-spin" /> }
                                    Generate Description with AI</Button>
                            </div> }
                            <div className="grid grid-cols-4 items-center gap-4">
                                <div className="flex flex-row justify-between">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                </div>
                                <Textarea onChange={(e) => setDescription(e.currentTarget.value)} value={description} id="description" name="description" className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="isDone" className="text-right">
                                    Completed ?
                                </Label>
                                <Checkbox id="isDone" name={"isDone"} className="col-span-3"/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">
                                <Loader2 className={`animate-spin ${isSaving ? 'block' : 'hidden'}`} />
                                Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
    )
}
export default AddTodoButton
