<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { io, Socket } from 'socket.io-client';
  import { AudioPlayer } from '$lib/audio/AudioPlayer';
  import { Mic, MicOff } from 'lucide-svelte';

  let socket: Socket;
  let audioPlayer: AudioPlayer;
  let history: { role: string; message: string }[] = [];
  let isStreaming: boolean = false;
  let processor: ScriptProcessorNode;

  const add = (role: string, message: string) => {
    let h = [...history];
    if (h.length && h[h.length-1].role === role) h[h.length-1].message += " " + message;
    else h.push({ role, message });
    history = h;
    setTimeout(() => document.querySelector('#chat')?.scrollTo(0, 1e9), 50);
  };

  onMount(() => {
    socket = io();
    audioPlayer = new AudioPlayer();
    socket.on('textOutput', (d: any) => add(d.role, d.content));
    socket.on('audioOutput', (d: any) => d.content && audioPlayer.playAudio(new Float32Array(new Int16Array(Uint8Array.from(atob(d.content), c => c.charCodeAt(0)).buffer)).map(v => v/32768)));
  });

  async function toggle() {
    if (isStreaming) {
        if (processor) processor.disconnect();
        isStreaming = false;
        return;
    }
    let ctx = new AudioContext({ sampleRate: 16000 });
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!audioPlayer.initialized) await audioPlayer.init();
    socket.emit('startAudio');
    socket.once('audioReady', () => {
        socket.emit('textInput', { content: 'hi' });
        let source = ctx.createMediaStreamSource(stream);
        processor = ctx.createScriptProcessor(512, 1, 1);
        processor.onaudioprocess = (e) => {
            if (!isStreaming) return;
            let input = e.inputBuffer.getChannelData(0);
            let pcm = new Int16Array(input.length);
            for (let i = 0; i < input.length; i++) pcm[i] = Math.max(-1, Math.min(1, input[i])) * 0x7FFF;
            socket.emit('audioInput', btoa(String.fromCharCode(...new Uint8Array(pcm.buffer))));
        };
        source.connect(processor);
        processor.connect(ctx.destination);
    });
    isStreaming = true;
  }

  onDestroy(() => socket?.disconnect());
</script>

<div class="flex flex-col flex-1 bg-white h-full font-sans">
  <div id="chat" class="flex-1 overflow-y-auto p-4 space-y-2">
    {#each history as m}
      <div class="flex {m.role === 'USER' ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%] p-2 rounded-lg {m.role === 'USER' ? 'bg-blue-500 text-white' : 'bg-gray-100'} text-sm">
          {m.message}
        </div>
      </div>
    {/each}
  </div>
  <div class="p-4 border-t flex justify-center">
    <button on:click={toggle} class="p-4 rounded-full {isStreaming ? 'bg-red-500' : 'bg-blue-500'} text-white shadow-lg">
      {#if isStreaming}<MicOff/>{:else}<Mic/>{/if}
    </button>
  </div>
</div>
