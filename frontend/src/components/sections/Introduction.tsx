import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Zap, Shield, Globe } from 'lucide-react';

export default function Introduction() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Introdução e Visão Geral
        </h1>
        <p className="text-lg text-muted-foreground">
          Bem-vindo ao futuro das finanças descentralizadas
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <p className="text-lg leading-relaxed">
          O <strong className="text-amber-400">Quantumoney (QMY)</strong> é um projeto revolucionário que combina 
          tecnologia blockchain de ponta com os princípios da economia quântica para criar um ecossistema 
          financeiro verdadeiramente descentralizado e eficiente. Construído sobre a Internet Computer, 
          o QMY oferece velocidade, escalabilidade e segurança incomparáveis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-400" />
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Democratizar o acesso às finanças descentralizadas, oferecendo uma plataforma segura, 
              eficiente e acessível para todos os usuários, independentemente de sua localização ou 
              experiência técnica.
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              Nossa Visão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Tornar-se a principal infraestrutura financeira do metaverso, conectando mundos virtuais 
              e reais através de uma economia digital sustentável e transparente.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
        <CardHeader>
          <CardTitle className="text-2xl">Valores Fundamentais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <Shield className="h-12 w-12 text-amber-400 mb-3" />
              <h3 className="font-semibold mb-2">Segurança</h3>
              <p className="text-sm text-muted-foreground">
                Contratos inteligentes auditados e arquitetura robusta
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Globe className="h-12 w-12 text-amber-400 mb-3" />
              <h3 className="font-semibold mb-2">Transparência</h3>
              <p className="text-sm text-muted-foreground">
                Todas as transações e decisões são públicas e verificáveis
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Zap className="h-12 w-12 text-amber-400 mb-3" />
              <h3 className="font-semibold mb-2">Inovação</h3>
              <p className="text-sm text-muted-foreground">
                Tecnologia de ponta para soluções financeiras do futuro
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Diferenciais Competitivos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Velocidade Incomparável:</strong> Transações finalizadas em menos de 2 segundos
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Custos Mínimos:</strong> Taxas de transação praticamente zero
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Escalabilidade Infinita:</strong> Arquitetura preparada para milhões de usuários
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Governança Descentralizada:</strong> Comunidade no controle das decisões
              </div>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
              </div>
              <div>
                <strong className="text-amber-400">Interoperabilidade:</strong> Integração nativa com múltiplas blockchains
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
