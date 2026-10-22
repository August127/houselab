import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OfficeRole } from '../data/siteData';
import { Eye, EyeOff, RotateCcw, Sparkles, ArrowRight, Compass, Layers } from 'lucide-react';

interface Interactive3DOfficeSceneProps {
  selectedRole: OfficeRole | 'Tất cả';
  onSelectRole: (role: OfficeRole) => void;
  onExploreRolePrompts: (role: OfficeRole) => void;
  isDark: boolean;
}

interface StationMeta {
  id: OfficeRole;
  title: string;
  subtitle: string;
  metric: string;
  color: number;
  hex: string;
  angle: number;
}

const STATIONS: StationMeta[] = [
  {
    id: 'Kế toán',
    title: 'Trạm Kế toán & Excel',
    subtitle: 'Tự động tạo hàm XLOOKUP, dò lệch bảng kê & đối chiếu công nợ',
    metric: 'Tiết kiệm 4.5 giờ/tuần',
    color: 0x059669,
    hex: '#10b981',
    angle: 0,
  },
  {
    id: 'Nhân sự',
    title: 'Trạm Nhân sự (HR)',
    subtitle: 'Viết JD chuẩn, tạo bộ câu hỏi phỏng vấn tình huống & khung đánh giá',
    metric: 'Rút gọn 70% thời gian tuyển',
    color: 0x2563eb,
    hex: '#3b82f6',
    angle: Math.PI / 3,
  },
  {
    id: 'Hành chính',
    title: 'Trạm Hành chính',
    subtitle: 'Chuẩn hóa thông báo nội bộ, biên bản cuộc họp & quy trình SOP',
    metric: '100% đúng văn phong công sở',
    color: 0x7c3aed,
    hex: '#8b5cf6',
    angle: (2 * Math.PI) / 3,
  },
  {
    id: 'Sales',
    title: 'Trạm Kinh doanh (Sales)',
    subtitle: 'Soạn chuỗi email bám đuổi khách hàng, kịch bản xử lý từ chối',
    metric: 'Tăng 35% tỷ lệ phản hồi',
    color: 0xd97706,
    hex: '#f59e0b',
    angle: Math.PI,
  },
  {
    id: 'Marketing',
    title: 'Trạm Content & Marketing',
    subtitle: 'Lập lịch 30 ngày nội dung đa kênh & viết bài truyền thông thu hút',
    metric: 'X3 tốc độ sản xuất bài',
    color: 0xdb2777,
    hex: '#ec4899',
    angle: (4 * Math.PI) / 3,
  },
  {
    id: 'Trợ lý & Quản lý',
    title: 'Trạm Quản lý & Báo cáo',
    subtitle: 'Tóm tắt tài liệu 50 trang thành 5 ý chính, giao việc OKR/KPI rõ ràng',
    metric: 'Ra quyết định trong 3 phút',
    color: 0xdc2626,
    hex: '#ef4444',
    angle: (5 * Math.PI) / 3,
  },
];

type CameraPreset = 'overview' | 'desk' | 'top';

export const Interactive3DOfficeScene: React.FC<Interactive3DOfficeSceneProps> = ({
  selectedRole,
  onSelectRole,
  onExploreRolePrompts,
  isDark,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeStation, setActiveStation] = useState<StationMeta>(
    STATIONS.find((s) => s.id === selectedRole) || STATIONS[0]
  );
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('overview');
  const [explodeFactor, setExplodeFactor] = useState<number>(0.18);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [dockCollapsed, setDockCollapsed] = useState<boolean>(false);

  const explodeRef = useRef<number>(explodeFactor);
  const autoRotateRef = useRef<boolean>(autoRotate);
  const selectedRoleRef = useRef<OfficeRole>(activeStation.id);
  const cameraTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 6.2, 11.5));
  const controlsTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.7, 0));

  useEffect(() => {
    explodeRef.current = explodeFactor;
  }, [explodeFactor]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const found = STATIONS.find((s) => s.id === selectedRole);
    if (found) {
      selectedRoleRef.current = found.id;
      setActiveStation(found);
    }
  }, [selectedRole]);

  const handlePresetChange = (preset: CameraPreset) => {
    setCameraPreset(preset);
    if (preset === 'overview') {
      cameraTargetPos.current.set(0, 6.2, 11.5);
      controlsTargetPos.current.set(0, 0.7, 0);
    } else if (preset === 'desk') {
      cameraTargetPos.current.set(0, 3.0, 5.6);
      controlsTargetPos.current.set(0, 1.1, 0);
    } else if (preset === 'top') {
      cameraTargetPos.current.set(0, 12.8, 2.2);
      controlsTargetPos.current.set(0, 0, 0);
    }
  };

  const focusOnStation = (station: StationMeta) => {
    selectedRoleRef.current = station.id;
    setActiveStation(station);
    onSelectRole(station.id);
    const radius = 7.8;
    const camX = Math.cos(station.angle) * radius;
    const camZ = Math.sin(station.angle) * radius;
    const nodeX = Math.cos(station.angle) * 4.2;
    const nodeZ = Math.sin(station.angle) * 4.2;
    cameraTargetPos.current.set(camX, 3.8, camZ);
    controlsTargetPos.current.set(nodeX * 0.65, 0.9, nodeZ * 0.65);
    setCameraPreset('overview');
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 540;

    // Detect software WebGL renderer (SwiftShader / llvmpipe)
    const probeCanvas = document.createElement('canvas');
    const probeGl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    const dbg = probeGl?.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = (dbg && probeGl ? probeGl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : '') || '';
    const isSoftwareGl = /swiftshader|llvmpipe|software|basic render/i.test(String(rendererStr));

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1.0 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const bgHex = isDark ? 0x090d16 : 0x0f172a;
    scene.background = new THREE.Color(bgHex);
    scene.fog = new THREE.FogExp2(bgHex, 0.036);

    // Studio IBL Environment for realistic metallic & glass materials
    const pmrem = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTex = pmrem.fromScene(roomEnv, 0.04).texture;
    scene.environment = envTex;
    roomEnv.dispose();
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.copy(cameraTargetPos.current);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.06;
    controls.minDistance = 3.8;
    controls.maxDistance = 18;
    controls.target.copy(controlsTargetPos.current);

    // 3-Point Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x1e1b4b, 0.65);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4);
    keyLight.position.set(6, 10, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 28;
      const d = 8.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x60a5fa, 1.1);
    fillLight.position.set(-7, 5, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x34d399, 1.3);
    rimLight.position.set(0, 6, -8);
    scene.add(rimLight);

    // Ground platform & radial ring grid
    const floorGroup = new THREE.Group();
    scene.add(floorGroup);

    const baseDiscGeo = new THREE.CylinderGeometry(6.8, 7.2, 0.24, 48);
    const baseDiscMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.45,
    });
    const baseDisc = new THREE.Mesh(baseDiscGeo, baseDiscMat);
    baseDisc.position.y = -0.12;
    baseDisc.receiveShadow = true;
    floorGroup.add(baseDisc);

    const ringGeo = new THREE.RingGeometry(4.12, 4.26, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = -Math.PI / 2;
    orbitRing.position.y = 0.02;
    floorGroup.add(orbitRing);

    const innerRingGeo = new THREE.RingGeometry(2.05, 2.12, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.02;
    floorGroup.add(innerRing);

    // Central AI Smart Desk (Multi-part procedural assembly)
    const centerHub = new THREE.Group();
    scene.add(centerHub);

    const pedGeo = new THREE.CylinderGeometry(1.35, 1.65, 0.55, 32);
    const pedMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.28,
      metalness: 0.75,
    });
    const pedestal = new THREE.Mesh(pedGeo, pedMat);
    pedestal.position.y = 0.28;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    centerHub.add(pedestal);

    const coreGlowGeo = new THREE.TorusGeometry(1.42, 0.045, 16, 48);
    const coreGlowMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });
    const coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
    coreGlow.rotation.x = Math.PI / 2;
    coreGlow.position.y = 0.56;
    centerHub.add(coreGlow);

    const deskGeo = new THREE.BoxGeometry(2.3, 0.12, 1.35);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.22,
      metalness: 0.6,
    });
    const deskTop = new THREE.Mesh(deskGeo, deskMat);
    deskTop.position.y = 0.92;
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    centerHub.add(deskTop);

    // Laptop Base + Screen
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, 1.0, 0.1);
    centerHub.add(laptopGroup);

    const lapBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.04, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 })
    );
    laptopGroup.add(lapBase);

    const lapScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.62, 0.04),
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x0284c7,
        emissiveIntensity: 0.75,
        roughness: 0.15,
      })
    );
    lapScreen.position.set(0, 0.3, -0.32);
    lapScreen.rotation.x = -0.18;
    laptopGroup.add(lapScreen);

    // Floating AI Core Crystal (Claude / ChatGPT / Gemini Triad)
    const aiTriadGroup = new THREE.Group();
    aiTriadGroup.position.set(0, 2.25, 0);
    centerHub.add(aiTriadGroup);

    const coreCrystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.46, 0),
      new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x059669,
        emissiveIntensity: 1.1,
        metalness: 0.4,
        roughness: 0.12,
      })
    );
    aiTriadGroup.add(coreCrystal);

    const orbitSphereColors = [0xf59e0b, 0x10b981, 0x38bdf8]; // Claude, ChatGPT, Gemini
    const orbitSpheres: THREE.Mesh[] = [];
    orbitSphereColors.forEach((col) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 20, 20),
        new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 1.2,
          roughness: 0.2,
        })
      );
      aiTriadGroup.add(m);
      orbitSpheres.push(m);
    });

    // 6 Clickable Role Stations arranged radially
    const interactableMeshes: THREE.Object3D[] = [];
    const stationGroups: {
      meta: StationMeta;
      group: THREE.Group;
      topModule: THREE.Group;
      ringMesh: THREE.Mesh;
      beamLine: THREE.Line;
    }[] = [];

    STATIONS.forEach((st) => {
      const radius = 4.2;
      const x = Math.cos(st.angle) * radius;
      const z = Math.sin(st.angle) * radius;

      const stGroup = new THREE.Group();
      stGroup.position.set(x, 0, z);
      stGroup.lookAt(0, 0, 0);
      stGroup.userData = { roleId: st.id };
      scene.add(stGroup);

      const podGeo = new THREE.CylinderGeometry(0.82, 0.96, 0.36, 24);
      const podMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.3,
        metalness: 0.7,
      });
      const podMesh = new THREE.Mesh(podGeo, podMat);
      podMesh.position.y = 0.18;
      podMesh.castShadow = true;
      podMesh.receiveShadow = true;
      podMesh.userData = { roleId: st.id };
      stGroup.add(podMesh);
      interactableMeshes.push(podMesh);

      const stRingGeo = new THREE.TorusGeometry(0.86, 0.04, 14, 36);
      const stRingMat = new THREE.MeshStandardMaterial({
        color: st.color,
        emissive: st.color,
        emissiveIntensity: 1.4,
        roughness: 0.2,
      });
      const stRing = new THREE.Mesh(stRingGeo, stRingMat);
      stRing.rotation.x = Math.PI / 2;
      stRing.position.y = 0.37;
      stGroup.add(stRing);

      const topModule = new THREE.Group();
      topModule.position.y = 0.95;
      stGroup.add(topModule);

      const accentMat = new THREE.MeshStandardMaterial({
        color: st.color,
        emissive: st.color,
        emissiveIntensity: 0.45,
        roughness: 0.22,
        metalness: 0.55,
      });
      const lightSurfaceMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.25,
        metalness: 0.3,
      });

      if (st.id === 'Kế toán') {
        [-0.32, 0, 0.32].forEach((bx, idx) => {
          const h = 0.38 + idx * 0.24;
          const bar = new THREE.Mesh(new THREE.BoxGeometry(0.22, h, 0.22), accentMat);
          bar.position.set(bx, h / 2 - 0.2, 0);
          bar.userData = { roleId: st.id };
          topModule.add(bar);
          interactableMeshes.push(bar);
        });
      } else if (st.id === 'Nhân sự') {
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 20, 20), accentMat);
        head.position.set(0, 0.32, 0);
        head.userData = { roleId: st.id };
        const body = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.34, 0.42, 20),
          lightSurfaceMat
        );
        body.position.set(0, -0.05, 0);
        body.userData = { roleId: st.id };
        topModule.add(head, body);
        interactableMeshes.push(head, body);
      } else if (st.id === 'Hành chính') {
        [0, 1, 2].forEach((layer) => {
          const doc = new THREE.Mesh(
            new THREE.BoxGeometry(0.68, 0.1, 0.52),
            layer === 2 ? accentMat : lightSurfaceMat
          );
          doc.position.set(0, layer * 0.18 - 0.1, 0);
          doc.rotation.y = (layer - 1) * 0.15;
          doc.userData = { roleId: st.id };
          topModule.add(doc);
          interactableMeshes.push(doc);
        });
      } else if (st.id === 'Sales') {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.62, 24), accentMat);
        cone.rotation.x = Math.PI;
        cone.position.y = 0.12;
        cone.userData = { roleId: st.id };
        topModule.add(cone);
        interactableMeshes.push(cone);
      } else if (st.id === 'Marketing') {
        const prism = new THREE.Mesh(new THREE.OctahedronGeometry(0.38, 0), accentMat);
        prism.position.y = 0.15;
        prism.userData = { roleId: st.id };
        const halo = new THREE.Mesh(
          new THREE.TorusGeometry(0.52, 0.03, 12, 32),
          lightSurfaceMat
        );
        halo.rotation.x = Math.PI / 3;
        halo.position.y = 0.15;
        halo.userData = { roleId: st.id };
        topModule.add(prism, halo);
        interactableMeshes.push(prism, halo);
      } else {
        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.52, 0.52), accentMat);
        cube.rotation.set(Math.PI / 5, Math.PI / 4, 0);
        cube.position.y = 0.16;
        cube.userData = { roleId: st.id };
        topModule.add(cube);
        interactableMeshes.push(cube);
      }

      const beamPts = [new THREE.Vector3(x, 0.45, z), new THREE.Vector3(0, 1.05, 0)];
      const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPts);
      const beamMat = new THREE.LineBasicMaterial({
        color: st.color,
        transparent: true,
        opacity: 0.45,
      });
      const beamLine = new THREE.Line(beamGeo, beamMat);
      scene.add(beamLine);

      stationGroups.push({
        meta: st,
        group: stGroup,
        topModule,
        ringMesh: stRing,
        beamLine,
      });
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactableMeshes, false);
      renderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist > 6) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactableMeshes, false);
      if (hits.length > 0) {
        const hitRole = hits[0].object.userData?.roleId as OfficeRole | undefined;
        if (hitRole) {
          const found = STATIONS.find((s) => s.id === hitRole);
          if (found) {
            selectedRoleRef.current = found.id;
            setActiveStation(found);
            onSelectRole(found.id);
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    let cancelled = false;
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const clock = new THREE.Clock();

    const afterDraw = (cb: () => void) => {
      if (isSoftwareGl) {
        timeoutId = setTimeout(() => {
          rafId = requestAnimationFrame(cb);
        }, 16);
      } else {
        rafId = requestAnimationFrame(cb);
      }
    };

    const tick = () => {
      if (cancelled) return;
      const elapsed = clock.getElapsedTime();
      const exp = explodeRef.current;

      if (autoRotateRef.current) {
        scene.rotation.y = elapsed * 0.14;
      }

      camera.position.lerp(cameraTargetPos.current, 0.04);
      controls.target.lerp(controlsTargetPos.current, 0.06);

      aiTriadGroup.position.y = 2.15 + exp * 1.1 + Math.sin(elapsed * 2.0) * 0.08;
      coreCrystal.rotation.y = elapsed * 0.9;
      coreCrystal.rotation.x = elapsed * 0.45;

      orbitSpheres.forEach((sp, idx) => {
        const a = elapsed * 1.6 + (idx * Math.PI * 2) / 3;
        const r = 0.85 + exp * 0.55;
        sp.position.set(Math.cos(a) * r, Math.sin(a * 2) * 0.15, Math.sin(a) * r);
      });

      stationGroups.forEach(({ meta, group, topModule, ringMesh }) => {
        const isCurrent = meta.id === selectedRoleRef.current;
        const radialDist = 4.2 + exp * 1.35;
        group.position.x = Math.cos(meta.angle) * radialDist;
        group.position.z = Math.sin(meta.angle) * radialDist;

        topModule.position.y =
          0.92 + exp * 0.85 + Math.sin(elapsed * 2.2 + meta.angle) * 0.06;
        topModule.rotation.y = elapsed * (isCurrent ? 1.1 : 0.35);

        const targetScale = isCurrent ? 1.22 : 1.0;
        group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const mat = ringMesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = isCurrent ? 2.4 : 0.9;
      });

      controls.update();
      renderer.render(scene, camera);
      afterDraw(tick);
    };

    tick();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      controls.dispose();
      envTex.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="w-full h-[520px] sm:h-[580px] lg:h-[620px] relative select-none"
        aria-label="Không gian 3D Văn phòng Thông minh AI Công Sở"
      />

      {/* Top-Left Title & Top-Right Station Inspector Overlay */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="pointer-events-auto max-w-md rounded-2xl bg-slate-900/95 border border-slate-800 p-4 text-white shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Không gian 3D Trực quan · Kéo chuột xoay 360°
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Mô hình Văn phòng Thông minh AI 3D
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Nhấp vào <strong>6 Trạm phòng ban 3D</strong> xung quanh bàn điều khiển trung tâm để xem sơ đồ tự động hóa bằng Claude, ChatGPT & Gemini.
          </p>
        </div>

        {/* Active Station Inspector Card (Top-Right) */}
        <div className="pointer-events-auto lg:w-80 rounded-2xl bg-slate-900/95 border border-slate-800 p-4 text-white shadow-xl">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold text-slate-400">Trạm 3D đang chọn</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800"
              style={{ color: activeStation.hex }}
            >
              {activeStation.metric}
            </span>
          </div>
          <h3 className="text-base font-bold text-white">{activeStation.title}</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {activeStation.subtitle}
          </p>
          <button
            onClick={() => onExploreRolePrompts(activeStation.id)}
            className="mt-3 w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
          >
            Xem công thức của {activeStation.id}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Unified Collapsible Bottom Control Dock */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-col items-center">
        {dockCollapsed ? (
          <button
            onClick={() => setDockCollapsed(false)}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/95 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white shadow-lg cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            ▴ Hiện bảng điều khiển 3D
          </button>
        ) : (
          <div className="pointer-events-auto w-full max-w-4xl rounded-2xl bg-slate-900/95 border border-slate-800 p-3 sm:p-4 text-white shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-1.5">
                {STATIONS.map((st) => {
                  const active = st.id === activeStation.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => focusOnStation(st)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      {st.id}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setDockCollapsed(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
              >
                <EyeOff className="w-3.5 h-3.5" />
                ▾ Ẩn điều khiển
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium inline-flex items-center gap-1 mr-1">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  Góc nhìn:
                </span>
                {(
                  [
                    { id: 'overview', label: 'Toàn cảnh 360°' },
                    { id: 'desk', label: 'Cận cảnh Bàn AI' },
                    { id: 'top', label: 'Sơ đồ từ trên' },
                  ] as { id: CameraPreset; label: string }[]
                ).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      cameraPreset === preset.id
                        ? 'bg-slate-700 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-1 min-w-[200px] max-w-xs">
                <span className="text-slate-400 font-medium inline-flex items-center gap-1 whitespace-nowrap">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  Tách lớp 3D:
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={explodeFactor}
                  onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                  aria-label="Thanh trượt tách lớp mô hình 3D"
                />
              </div>

              <button
                onClick={() => setAutoRotate((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  autoRotate
                    ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700/60'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {autoRotate ? 'Đang tự xoay' : 'Tạm dừng xoay'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
