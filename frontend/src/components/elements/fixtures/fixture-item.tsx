
interface FixtureItemProps {
    fixture: any
}

const FixtureItem = (props: FixtureItemProps) => {
    return (
        <div className="grid-cols-12 gap-5">
            <div className="col-span-4">{ props.fixture.fixture }</div>
        </div>
    )
}

export default FixtureItem;