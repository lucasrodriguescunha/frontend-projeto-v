import React from 'react';
import {FileUpload} from 'primereact/fileupload';

const Upload = () => {
    return (
        <div className="card">
            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000}
                        chooseLabel={"Escolher"} cancelLabel={"Cancelar"}
                        emptyTemplate={<p className="m-0">Arraste e solte os arquivos aqui para fazer upload.</p>}/>
        </div>
    )
}

export default Upload;