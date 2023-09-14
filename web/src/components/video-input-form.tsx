import { Separator } from '@radix-ui/react-separator';
import { FileVideo, Upload } from 'lucide-react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ChangeEvent, useMemo, useState } from 'react';

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) return;

    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null;

    return URL.createObjectURL(videoFile); // create preview of file
  }, [videoFile]);

  return (
    <form className="space-y-6">
      <label
        htmlFor="video"
        className="relative flex flex-col items-center justify-center gap-2 text-sm border border-dashed rounded-md cursor-pointer aspect-video text-muted-foreground hover:bg-primary/30"
      >
        {videoFile ? (
          <video
            src={previewURL!}
            controls={false}
            className="absolute inset-0 pointer-events-none"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Selecione um video
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label className="" htmlFor="transcription_prompt">
          Prompt de transcrição
        </Label>
        <Textarea
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder='Inclua palavras chaves mencionadas no video separadas por ","'
        />
      </div>

      <Button type="submit" className="w-full">
        Carregar video <Upload className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
}
