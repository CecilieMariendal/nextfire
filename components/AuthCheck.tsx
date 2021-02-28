import { UserContext } from "../lib/context";
import Link from 'next/link';
import { useContext } from 'react';

export default function AuthCheck(props) {
    const {username} = useContext(UserContext);

    return username ? props.children: props.fallback ?? <Link href="/intro">You must be signed in</Link>;
}