import { Github, Wand2 } from 'lucide-react';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Separator } from './components/ui/separator';
import { Slider } from './components/ui/slider';
import { Textarea } from './components/ui/textarea';
import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';

export function App() {
  const [temperature,setTemperature] = useState(0.5);
  const [ videoId, setVideoId ] = useState<string | null>(null);

  function handlePromptSelected(template: string) {
    console.log(template);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-6 py-3 border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💜 no NLW da @Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant={'outline'}>
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </div>

      <main className="flex flex-1 gap-6 p-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid flex-1 grid-rows-2 gap-4">
            <Textarea
              placeholder="Inclua o prompt para a IA"
              className="p-5 leading-relaxed resize-none"
            />
            <Textarea
              placeholder="Resultado gerado para IA"
              className="p-5 leading-relaxed resize-none"
              readOnly
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a{' '}
            <code className="text-violet-400">{'{transcription}'}</code> no seu
            prompt para adicionar o conteúdo da transcrição do video selecionado
          </p>
        </div>
        <aside className="space-y-6 w-80">
          <VideoInputForm onVideoUploaded={setVideoId}/>

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>

              <PromptSelect onPromptSelected={handlePromptSelected} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="block italic text-xm text-muted-foreground">
                Você poderá customizar o modelo em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className="block italic leading-relaxed text-xm text-muted-foreground">
                Valores mais altos geram resultados mais criativos, mas menos
                coerentes e vice-versa
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
              Executar <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
