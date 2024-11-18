import { useEffect } from "react"
import PostEditing from "../../components/PostEditing";
import CustomBox from "../../components/shared/CustomBox";
import Widget from "../../components/shared/Widget";

const Feed = () => {
    useEffect(() => {
        document.title = "Feed - Found!";
    }, []);
    return (
        <>
            <div className="flex gap-6">
                <div className="w-full max-w-[640px]">
                    <PostEditing />
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    <CustomBox title="Il mio feed">
                        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                </div>
                <div className="w-full max-w-[360px]">
                    <Widget/>
                </div>
            </div>
        </>
    )
}

export default Feed