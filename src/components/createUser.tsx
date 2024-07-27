import { useRef, useState } from 'react';

interface CreateUserProps {
    isControlledForm: boolean;
}

export const CreateUser = (props: CreateUserProps) => {
    const { isControlledForm } = props;
    console.log({ isControlledForm });

    const [userName, setUserName] = useState('');
    const [mobile, setMobile] = useState('');

    const nameInputRef = useRef<any>(null);

    const onChangeUserName = (event: any) => {
        setUserName(event.target.value);
    };

    const onChangeMobile = (event: any) => {
        console.log({ mobile });
        setMobile(event.target.value);
    };

    const onSubmit = (e: any) => {
        e.preventDefault()
        if (nameInputRef?.current) nameInputRef?.current?.focus()
    };

    return (
        <div>
            <form name="user" onSubmit={onSubmit}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <label>User Name*</label>
                    <input
                        ref={nameInputRef}
                        // form="user"
                        name="name"
                        value={userName}
                        onChange={onChangeUserName}
                        placeholder="Enter user name"
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <label>Mobile No*</label>
                    <input
                        // form="user"
                        name="mobile"
                        type='tel'
                        value={mobile}
                        onChange={onChangeMobile}
                        placeholder="Enter mobile number"
                    />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
