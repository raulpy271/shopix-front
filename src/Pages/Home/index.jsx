import Template from '../../Layouts/Template';

export default function Home() {
  return (
    <div>
      <Template>
        <h1>Página inicial</h1>
        <h1>sem copilot</h1>
        <form>
          <div>
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" name="nome"/>
          </div>
        </form>
      </Template>
    </div>
  )
}
