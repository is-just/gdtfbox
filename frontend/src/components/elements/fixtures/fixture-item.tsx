import { DownloadFixture, SetDestFolder } from "../../../../wailsjs/go/backend/App"

interface FixtureItemProps {
    fixture: any
}

const FixtureItem = (props: FixtureItemProps) => {
    return (
        <div className="grid grid-cols-12 gap-5 border-white border-b last:border-b-0 text-xs hover:bg-white">
            <div className="col-span-4 px-5 py-2">{ props.fixture.fixture }</div>
            <div>{props.fixture.rating !== "N/A" ? props.fixture.rating : '0.0' }/5.0</div>
            <div>{ props.fixture.modes.length }</div>
            <div>{ props.fixture.lastModified }</div>
            <div>{ props.fixture.uploader === 'Manuf.' ? 'Manufacturer' : 'User'}</div>
            <div className="col-span-4">
                <button onClick={() => DownloadFixture(props.fixture as any, true)}>save</button>
                <button onClick={() => DownloadFixture(props.fixture as any, false)}>save as</button>
            </div>
        </div>
    )
}

export default FixtureItem;