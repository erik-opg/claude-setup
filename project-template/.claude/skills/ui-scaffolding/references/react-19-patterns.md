# React 19 Patterns

## use() API - Read Promises and Context

### Reading Promises
```typescript
import { use, Suspense } from 'react'

interface User {
  id: string
  name: string
  email: string
}

// Component that reads a promise
function UserName({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise)
  return <span>{user.name}</span>
}

// Parent creates and passes the promise
export default function UserProfile({ userId }: { userId: string }) {
  const userPromise = fetchUser(userId) // Don't await here

  return (
    <Suspense fallback={<span>Loading...</span>}>
      <UserName userPromise={userPromise} />
    </Suspense>
  )
}
```

### Reading Context
```typescript
import { use, createContext } from 'react'

const ThemeContext = createContext<'light' | 'dark'>('light')

function ThemedButton() {
  // Can be called conditionally (unlike useContext)
  const theme = use(ThemeContext)
  return <button className={theme}>Click me</button>
}

// Conditional context reading
function ConditionalTheme({ shouldTheme }: { shouldTheme: boolean }) {
  if (shouldTheme) {
    const theme = use(ThemeContext)
    return <div className={theme}>Themed content</div>
  }
  return <div>Unthemed content</div>
}
```

## useActionState() - Form State Management

```typescript
'use client'
import { useActionState } from 'react'

interface FormState {
  message: string
  success: boolean
  errors?: { field: string; message: string }[]
}

// Server Action
async function submitForm(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  // Validation
  const errors: { field: string; message: string }[] = []
  if (!name) errors.push({ field: 'name', message: 'Name is required' })
  if (!email) errors.push({ field: 'email', message: 'Email is required' })

  if (errors.length > 0) {
    return { message: 'Validation failed', success: false, errors }
  }

  // Submit to database
  await saveUser({ name, email })

  return { message: 'User created successfully', success: true }
}

function CreateUserForm() {
  const [state, formAction] = useActionState(submitForm, null)

  return (
    <form action={formAction}>
      {state?.message && (
        <div className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required />
        {state?.errors?.find(e => e.field === 'name') && (
          <span className="text-red-500">
            {state.errors.find(e => e.field === 'name')?.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        {state?.errors?.find(e => e.field === 'email') && (
          <span className="text-red-500">
            {state.errors.find(e => e.field === 'email')?.message}
          </span>
        )}
      </div>

      <SubmitButton />
    </form>
  )
}
```

## useFormStatus() - Form Pending State

```typescript
'use client'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Spinner className="animate-spin mr-2" />
          Submitting...
        </>
      ) : (
        'Submit'
      )}
    </button>
  )
}

// Usage in form
function ContactForm() {
  return (
    <form action={submitAction}>
      <input name="message" />
      <SubmitButton /> {/* Must be child of form */}
    </form>
  )
}
```

## useOptimistic() - Optimistic UI Updates

```typescript
'use client'
import { useOptimistic, useTransition } from 'react'

interface Todo {
  id: string
  text: string
  completed: boolean
}

function TodoList({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state: Todo[], newTodo: Todo) => [...state, newTodo]
  )

  async function addTodo(formData: FormData) {
    const text = formData.get('text') as string
    const newTodo: Todo = {
      id: `temp-${Date.now()}`,
      text,
      completed: false
    }

    // Optimistically add todo
    addOptimisticTodo(newTodo)

    // Actually save to server
    startTransition(async () => {
      await saveTodo(newTodo)
    })
  }

  return (
    <div>
      <form action={addTodo}>
        <input name="text" placeholder="New todo" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} className={todo.id.startsWith('temp-') ? 'opacity-50' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## useTransition() - Non-Blocking Updates

```typescript
'use client'
import { useState, useTransition } from 'react'

function SearchResults() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value) // Urgent: update input immediately

    startTransition(async () => {
      // Non-urgent: fetch results without blocking UI
      const searchResults = await fetchResults(value)
      setResults(searchResults)
    })
  }

  return (
    <div>
      <input value={query} onChange={handleSearch} />
      {isPending && <span>Searching...</span>}
      <ul>
        {results.map(result => <li key={result}>{result}</li>)}
      </ul>
    </div>
  )
}
```

## Server Actions with Form

```typescript
// actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.post.create({ data: { title, content } })

  revalidatePath('/posts')
  redirect('/posts')
}

// page.tsx
import { createPost } from './actions'

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  )
}
```

## Error Handling in Actions

```typescript
'use server'

import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function signUp(prevState: any, formData: FormData) {
  const result = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    }
  }

  try {
    await createUser(result.data)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      errors: { _form: ['Failed to create account'] }
    }
  }
}
```
