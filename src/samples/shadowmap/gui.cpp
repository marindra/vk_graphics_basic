#include "shadowmap_render.h"

#include "../../render/render_gui.h"

void SimpleShadowmapRender::SetupGUIElements()
{
  ImGui_ImplVulkan_NewFrame();
  ImGui_ImplGlfw_NewFrame();
  ImGui::NewFrame();
  {
//    ImGui::ShowDemoWindow();
    ImGui::Begin("Simple render settings");

    ImGui::ColorEdit3("Meshes base color", m_uniforms.baseColor.M, ImGuiColorEditFlags_PickerHueWheel | ImGuiColorEditFlags_NoInputs);
    ImGui::SliderFloat3("Light source position", m_uniforms.lightPos.M, -10.f, 10.f);

    ImGui::SliderFloat("Brightness of light", &brightness, 0.1f, 5.0f);

    ImGui::Combo("Tone mapping", &currentToneMappingMode, toneMappingModes, std::size(toneMappingModes));
    if (toneMappingModes[currentToneMappingMode][0] == 'E') // Exposure mode. I did it by this way to avoid problems with my innatention. But be careful - I have comparsion by numbers at the shader!
    {
      ImGui::SliderFloat("Exposure", &exposure, 0.0f, 5.0f);
    }

    ImGui::Text("Application average %.3f ms/frame (%.1f FPS)", 1000.0f / ImGui::GetIO().Framerate, ImGui::GetIO().Framerate);

    ImGui::NewLine();

    ImGui::TextColored(ImVec4(1.0f, 1.0f, 0.0f, 1.0f),"Press 'B' to recompile and reload shaders");
    ImGui::End();
  }

  // Rendering
  ImGui::Render();
}
