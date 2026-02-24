import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Database, Vote, Layers, MapPin, Eye, Shield, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function GameArchitecture() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
          Arquitetura Técnica do Jogo AR
        </h1>
        <p className="text-lg text-muted-foreground">
          Sistema completo de integração entre realidade aumentada, blockchain ICP e governança descentralizada
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="overview">Visão Macro</TabsTrigger>
          <TabsTrigger value="components">Componentes</TabsTrigger>
          <TabsTrigger value="dataflow">Fluxo de Dados</TabsTrigger>
          <TabsTrigger value="diagram">Diagrama</TabsTrigger>
          <TabsTrigger value="mvp">MVP</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">Visão Macro do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  O sistema Quantumoney AR opera através da integração harmoniosa de quatro camadas tecnológicas principais, 
                  criando um ecossistema descentralizado onde jogadores podem coletar tokens QMY através de interações AR 
                  baseadas em localização, com toda a lógica de jogo sendo validada e armazenada de forma descentralizada 
                  na blockchain ICP.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Smartphone className="h-5 w-5 text-amber-400" />
                      Camada de Interface (AR Mobile)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Aplicativo mobile com realidade aumentada que utiliza GPS e sensores para criar experiência 
                      imersiva de coleta de tokens e captura de monstros no mundo real.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Database className="h-5 w-5 text-amber-400" />
                      Camada de Lógica (Blockchain ICP)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Canisters inteligentes que processam toda lógica de jogo, validações e transações, 
                      garantindo integridade e descentralização das operações.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Vote className="h-5 w-5 text-amber-400" />
                      Camada de Governança (DAO)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Sistema descentralizado de tomada de decisões e gestão da tesouraria, permitindo que a 
                      comunidade controle o futuro do jogo.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Layers className="h-5 w-5 text-amber-400" />
                      Camada de Dados (ICP Ledger)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Registro imutável de todas as transações e estados do jogo, garantindo transparência 
                      e auditabilidade completa do ecossistema.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <img 
                  src="/assets/generated/arquitetura-sistema-completo.dim_1000x700.png" 
                  alt="Arquitetura do Sistema Completo" 
                  className="w-full rounded-lg border border-amber-500/20"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">Componentes Principais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold">App Mobile (Android/iOS)</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 ml-13">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Eye className="h-3 w-3 text-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Interface AR:</strong>
                      <p className="text-sm text-muted-foreground">Renderização de elementos virtuais sobrepostos ao mundo real</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Layers className="h-3 w-3 text-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">HUD Interativo:</strong>
                      <p className="text-sm text-muted-foreground">Exibição em tempo real de XP, energia, saldo QMY e inventário</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="h-3 w-3 text-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">GPS Funcional:</strong>
                      <p className="text-sm text-muted-foreground">Localização precisa para detecção de spots de coleta</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="h-3 w-3 text-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Sistema de Captura:</strong>
                      <p className="text-sm text-muted-foreground">Mecânica para coleta de monstros e tokens QMY</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="h-3 w-3 text-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Autenticação:</strong>
                      <p className="text-sm text-muted-foreground">Integração com Internet Identity para login seguro</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Database className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Canister Principal do Jogo (ICP)</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 ml-13">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Lógica de Jogo:</strong>
                      <p className="text-sm text-muted-foreground">Processamento de todas as regras e mecânicas do jogo</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Sistema de XP:</strong>
                      <p className="text-sm text-muted-foreground">Gerenciamento de experiência e progressão do jogador</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Controle de Energia:</strong>
                      <p className="text-sm text-muted-foreground">Limitação de ações baseada em sistema de energia</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Inventário:</strong>
                      <p className="text-sm text-muted-foreground">Armazenamento de itens e monstros coletados</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Gestão de Tokens:</strong>
                      <p className="text-sm text-muted-foreground">Distribuição e validação de tokens QMY</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Validação de Transações:</strong>
                      <p className="text-sm text-muted-foreground">Verificação de legitimidade das ações do jogador</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Vote className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Canister DAO</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4 ml-13">
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Governança Descentralizada:</strong>
                      <p className="text-sm text-muted-foreground">Sistema de propostas e votações da comunidade</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Tesouraria:</strong>
                      <p className="text-sm text-muted-foreground">Gestão dos fundos e recursos do ecossistema</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Aprovações de Queima:</strong>
                      <p className="text-sm text-muted-foreground">Validação de processos de burn de tokens</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div>
                      <strong className="text-amber-400">Sistema de Staking:</strong>
                      <p className="text-sm text-muted-foreground">Mecanismos de stake e recompensas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <img 
                  src="/assets/generated/componentes-principais.dim_700x500.png" 
                  alt="Componentes Principais" 
                  className="w-full rounded-lg border border-amber-500/20"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dataflow" className="space-y-6">
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">Fluxo de Dados End-to-End</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Processo Completo de Coleta</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Detecção GPS</h4>
                      <p className="text-sm text-muted-foreground">
                        Sensor GPS identifica localização do jogador em tempo real com precisão de metros
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 border-l-2 border-amber-500/30 h-6" />
                  
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Renderização AR</h4>
                      <p className="text-sm text-muted-foreground">
                        Sistema AR renderiza spots de coleta e monstros baseados na localização detectada
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 border-l-2 border-amber-500/30 h-6" />
                  
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Interação HUD</h4>
                      <p className="text-sm text-muted-foreground">
                        Jogador interage com elementos através da interface, tocando para coletar
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 border-l-2 border-amber-500/30 h-6" />
                  
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Validação Blockchain</h4>
                      <p className="text-sm text-muted-foreground">
                        Canister Principal valida a ação, localização e disponibilidade de energia
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 border-l-2 border-amber-500/30 h-6" />
                  
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 font-bold shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Atualização de Saldo</h4>
                      <p className="text-sm text-muted-foreground">
                        Tokens QMY são creditados no saldo do jogador e XP é incrementado
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 border-l-2 border-amber-500/30 h-6" />
                  
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 font-bold shrink-0">
                      6
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Sincronização</h4>
                      <p className="text-sm text-muted-foreground">
                        Estado atualizado é sincronizado com o frontend via React Query
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <img 
                  src="/assets/generated/fluxo-dados-completo.dim_800x600.png" 
                  alt="Fluxo de Dados Completo" 
                  className="w-full rounded-lg border border-amber-500/20"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Sincronização Frontend-Backend</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                    <CardHeader>
                      <CardTitle className="text-lg">React Query</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Gerenciamento de estado e cache para chamadas ICP, garantindo performance e consistência
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Update Calls</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Operações que modificam estado na blockchain, processadas de forma segura e auditável
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Query Calls</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Consultas rápidas para obter dados atualizados sem modificar estado
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Optimistic Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Atualizações imediatas na interface com confirmação posterior pela blockchain
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Sistema Antifraude</h3>
                <div className="space-y-4">
                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Validação Haversine</h4>
                          <p className="text-sm text-muted-foreground">
                            Verificação de distância real entre localizações usando fórmula Haversine para detectar 
                            movimentos impossíveis ou teleporte
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Bloqueio de Spoofing</h4>
                          <p className="text-sm text-muted-foreground">
                            Detecção de localização falsa ou manipulada através de análise de padrões de movimento 
                            e consistência temporal
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Limites Transacionais</h4>
                          <p className="text-sm text-muted-foreground">
                            Restrições de coleta por tempo e localização, impedindo farming excessivo e comportamento 
                            não natural
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Análise de Padrões</h4>
                          <p className="text-sm text-muted-foreground">
                            Identificação de comportamentos suspeitos através de machine learning e análise estatística 
                            de ações do jogador
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagram" className="space-y-6">
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">Diagrama Lógico Simplificado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  O diagrama abaixo ilustra o fluxo completo de dados e interações entre os componentes do sistema, 
                  desde a interação do usuário até a confirmação na blockchain.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border border-amber-500/30 rounded-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 shrink-0">
                      <Smartphone className="h-6 w-6 text-amber-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-amber-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Usuário</h4>
                      <p className="text-sm text-muted-foreground">Interage com o app mobile</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-amber-500/30 h-8" />

                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 shrink-0">
                      <Eye className="h-6 w-6 text-amber-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-amber-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold">App (AR/GPS/HUD)</h4>
                      <p className="text-sm text-muted-foreground">Renderiza interface e captura localização</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-amber-500/30 h-8" />

                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 shrink-0">
                      <Database className="h-6 w-6 text-amber-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-amber-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Canister Principal</h4>
                      <p className="text-sm text-muted-foreground">Valida ações e processa lógica de jogo</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-amber-500/30 h-8" />

                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 shrink-0">
                      <Vote className="h-6 w-6 text-amber-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-amber-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold">DAO</h4>
                      <p className="text-sm text-muted-foreground">Gerencia governança e tesouraria</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-amber-500/30 h-8" />

                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-500/20 shrink-0">
                      <Layers className="h-6 w-6 text-amber-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-amber-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Blockchain ICP</h4>
                      <p className="text-sm text-muted-foreground">Registra transações de forma imutável</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-amber-500/30 h-8" />

                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-500/20 shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-green-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Retorno ao Jogador</h4>
                      <p className="text-sm text-muted-foreground">Confirmação e atualização de saldo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Módulos e Conexões Seguras</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Internet Identity Login</h4>
                          <p className="text-sm text-muted-foreground">
                            Autenticação descentralizada e segura sem necessidade de senhas tradicionais
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">ICP Ledger Calls</h4>
                          <p className="text-sm text-muted-foreground">
                            Chamadas seguras para registro de transações de tokens QMY
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Criptografia End-to-End</h4>
                          <p className="text-sm text-muted-foreground">
                            Todas as comunicações entre app e canisters são criptografadas
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-amber-500/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Shield className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2">Validação de Assinaturas</h4>
                          <p className="text-sm text-muted-foreground">
                            Cada transação é assinada digitalmente pelo usuário
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-8">
                <img 
                  src="/assets/generated/hud-interface-ar.dim_800x600.png" 
                  alt="Interface HUD AR" 
                  className="w-full rounded-lg border border-amber-500/20"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mvp" className="space-y-6">
          <Card className="border-amber-500/20">
            <CardHeader>
              <CardTitle className="text-2xl">Definição do MVP (Produto Mínimo Viável)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground">
                  O MVP do Quantumoney AR Game focará nas funcionalidades essenciais para validar o conceito 
                  e proporcionar uma experiência de jogo completa e funcional.
                </p>
              </div>

              <div className="grid gap-4">
                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Login com Internet Identity</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sistema de autenticação descentralizada permitindo que usuários façam login de forma 
                          segura sem necessidade de senhas tradicionais.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Essencial</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Segurança</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Mapa com GPS em Tempo Real</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Interface de mapa mostrando a localização do jogador em tempo real e spots de coleta 
                          próximos baseados em coordenadas GPS.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Core</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Localização</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Spots AR e Coleta de QMY</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Renderização de elementos AR no mundo real permitindo que jogadores coletem tokens QMY 
                          baseado em sua localização e nível de XP.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Core</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">AR</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Gameplay</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Sistema de XP e Energia</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Mecânica de progressão através de pontos de experiência (XP) e sistema de energia que 
                          limita ações do jogador, regenerando ao longo do tempo.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Progressão</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Balanceamento</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">HUD com Informações do Jogador</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Interface heads-up display mostrando em tempo real: XP atual, saldo de tokens QMY, 
                          energia disponível e nível do jogador.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-green-500/30 text-green-400">UI/UX</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Feedback</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Anti-Spoofing GPS Básico</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sistema de validação básico para detectar e bloquear tentativas de falsificação de 
                          localização GPS, garantindo fair play.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Segurança</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Antifraude</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 shrink-0">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Sincronização On-Chain</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Todas as ações do jogador são validadas e registradas no Canister Principal, garantindo 
                          integridade e descentralização dos dados.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Blockchain</Badge>
                          <Badge variant="outline" className="border-green-500/30 text-green-400">Descentralização</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <img 
                  src="/assets/generated/mvp-funcionalidades.dim_600x400.png" 
                  alt="Funcionalidades do MVP" 
                  className="w-full rounded-lg border border-amber-500/20"
                />
              </div>

              <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-400" />
                    Próximos Passos Pós-MVP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      Sistema de batalhas entre jogadores (PvP)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      Marketplace para troca de monstros e itens
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      Eventos especiais baseados em localização
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      Sistema de guilds e cooperação entre jogadores
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      Integração com outras blockchains via ICP
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-400">•</span>
                      Sistema avançado de detecção de fraudes com ML
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
