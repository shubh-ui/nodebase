"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    variableName: z.string({})
    .min(1, {message: "Variable name is required"})
     .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
        message: "Variable name must start with a letter or underscore and only contain only letter, numbers and underscore"
     }),
    endpoint: z.string().url({ message: "Please enter a valid URL" }),
    method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
    body: z.string().optional()

})
export type HttpRwquestFormValues = z.infer<typeof formSchema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void,
    defaultValues: Partial<HttpRwquestFormValues>
}

export const HttpRequestDialog = ({
    open,
    onOpenChange,
    onSubmit,
    defaultValues = {}
}:Props) =>  {

    console.log("default value", defaultValues)
    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues : {
            body:defaultValues.body || "",
            variableName: defaultValues.variableName || "",
            endpoint: defaultValues.endpoint || "",
            method: defaultValues.method || "GET"
        }
    });

    const watchMethod = form.watch("method");
    const watchVariableName = form.watch("variableName") || "myApiCall";
    const showBodyField = ["POST", "PUT", 'PATCH'].includes(watchMethod);


    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    }

    // Reset form values when dialog opens with new defaults
    useEffect(() => {
        if (open) {
            console.log("default values",defaultValues)
            form.reset({
                endpoint: defaultValues.endpoint || "", 
                method: defaultValues.method || "GET", 
                body: defaultValues.body || "",
                variableName: defaultValues.variableName || ""
            })
        }
    }, [open, defaultValues])


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Http Request
                    </DialogTitle>
                    <DialogDescription>
                        Configure settings for the Http Request.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-4">
                        <FormField
                            control={form.control} name="variableName"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Variable Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                             placeholder="myApiCall"
                                        />
                                    </FormControl>
                                    <FormDescription>Use this name to reference he result in other nodes: {" "} {`{${watchVariableName}.ttpResponse.data}`}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            }
                        />
                        <FormField
                            control={form.control} name="method"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Method</FormLabel>
                                    <Select onValueChange={field.onChange}
                                        defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="GET">GET</SelectItem>
                                            <SelectItem value="POST">POST</ SelectItem>
                                            <SelectItem value="PUT">PUT</SelectItem>
                                            <SelectItem value="PATCH">PATCH</SelectItem>
                                            <SelectItem value="DELETE" >DELETE</ SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>The HTTP method to use for this request</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            }
                        />

                        <FormField
                            control={form.control} name="endpoint"
                            render={({ field }) =>
                                <FormItem>
                                    <FormLabel>Endpoint URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                             placeholder="https://api. example.com/users/{{httpResponse.data.id}}"
                                        />
                                    </FormControl>
                                    <FormDescription>Statig URL or use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            }
                        />
                        {
                            showBodyField && (
                                <FormField
                                    control={form.control} name="body"
                                    render={({ field }) =>
                                        <FormItem>
                                            <FormLabel>Request Body</FormLabel>
                                            <FormControl>
                                                <Textarea {...field}
                                                    placeholder={
                                                        '{\n  "userId": "{{httpResponse.data.id}}",\n  "name": "{{httpResponse.data.name}}",\n  "items": "{{httpResponse.data.items}}"\n}'
                                                    }

                                                    className="min-h-[120px] font-mono text-sm"
                                                />
                                            </FormControl>
                                            <FormDescription>Statig URL or use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    }
                                />
                            )
                        }
                        <DialogFooter className="mt-4">
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}